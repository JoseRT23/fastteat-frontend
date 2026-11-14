import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Badge, Button, FormField, PageHeader } from "../components/ui";
import type {
  BusinessUser,
  Invitation,
  InvitationStatus,
  UserRole,
} from "../types";
import { apiService } from "../services/apiService";

interface InviteDraft {
  email: string;
  role: UserRole | "";
}

interface UserDraft {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
}

const roleLabelMap: Record<UserRole, string> = {
  ADMIN: "Administrador",
  OWNER: "Propietario",
  STAFF: "Colaborador",
  CUSTOMER: "Cliente",
};

const invitationStatusLabelMap: Record<InvitationStatus, string> = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  DECLINED: "Rechazada",
  EXPIRED: "Expirada",
  CANCELLED: "Cancelada",
};

const emptyInviteDraft = (): InviteDraft => ({
  email: "",
  role: "",
});

const emptyUserDraft = (): UserDraft => ({
  name: "",
  email: "",
  role: "STAFF",
});

export function UsersPage() {
  const [userList, setUserList] = useState<BusinessUser[]>([]);
  const [invitationList, setInvitationList] = useState<Invitation[]>([]);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteDraft, setInviteDraft] = useState<InviteDraft>(emptyInviteDraft());
  const [userDraft, setUserDraft] = useState<UserDraft>(emptyUserDraft());

  useEffect(() => {
    loadUsers();
    loadInvitations();
  }, []);
    
  const loadUsers = () => {
    apiService.getBusinessUsers()
    .then(users => setUserList(users))
    .catch(error => console.log(error))
  }

  const loadInvitations = () => {
    apiService.getAllInvitations()
      .then((invitations) => setInvitationList(invitations))
      .catch((error) => console.log(error));
  };

  const openEditUserModal = (user: BusinessUser) => {
    setUserDraft({
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const closeInviteModal = () => {
    loadInvitations();
    setInviteModalOpen(false);
    setInviteDraft(emptyInviteDraft());
  };

  const closeCreateUserModal = () => {
    loadUsers();
    setIsModalOpen(false);
    setUserDraft(emptyUserDraft());
  };

  const handleInviteSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inviteDraft.email || !inviteDraft.role) return;

    const nextInvitation: Invitation = {
      email: inviteDraft.email,
      role: inviteDraft.role,
      status: "PENDING",
    };

    await apiService.inviteUser(nextInvitation);
    closeInviteModal();
  };

  const handleUpdateUserSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!userDraft.email || !userDraft.name || !userDraft.id) return;

    const nextUser: BusinessUser = {
      user_id: userDraft.id,
      name: userDraft.name,
      email: userDraft.email,
      role: userDraft.role,
      active: true,
    };

    await apiService.updateBusinessUserRole(nextUser.user_id, nextUser.role);
    closeCreateUserModal();
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Usuarios e invitaciones"
        actions={
          <>
            <Button onClick={() => setInviteModalOpen(true)}>
              Invitar usuario
            </Button>

            {/* <Button variant="secondary" onClick={openCreateUserModal}>
              Crear usuario
            </Button> */}
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            Usuarios del negocio
          </h2>

          <ul className="grid gap-3">
            {userList.map((user) => (
              <li
                key={user.user_id}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-md bg-neutral-50 p-3 hover:bg-neutral-100"
                onClick={() => openEditUserModal(user)}
              >
                <div>
                  <strong className="block text-sm text-neutral-900">
                    {user.name}
                  </strong>

                  <small className="text-xs text-neutral-500">
                    {user.email}
                  </small>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="border border-neutral-300">
                    {roleLabelMap[user.role]}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="cursor-pointer rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            Invitaciones
          </h2>

          <ul className="grid gap-3">
            {invitationList.length === 0 && (
              <li className="rounded-md bg-neutral-50 text-center p-3 text-sm text-neutral-500">
                No hay invitaciones pendientes.
              </li>
            )}

            {invitationList.map((invitation) => (
              <li key={invitation.business_invitation_id}
                className="flex items-center justify-between gap-3 rounded-md bg-neutral-50 p-3"
              >
                <div>
                  <strong className="block text-sm text-neutral-900">
                    {invitation.email}
                  </strong>

                  <small className="text-xs text-neutral-500">
                    {roleLabelMap[invitation.role]}
                  </small>
                </div>

                <Badge
                  variant={
                    invitation.status === "PENDING" ? "warning" : "neutral"
                  }
                >
                  {invitationStatusLabelMap[invitation.status]}
                </Badge>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <Modal
        open={inviteModalOpen}
        title="Invitar usuario"
        onClose={closeInviteModal}
      >
        <form className="grid gap-4" onSubmit={handleInviteSubmit}>
          <FormField id="invite-email" label="Email">
            <input
              className="rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="invite-email"
              type="email"
              value={inviteDraft.email}
              onChange={(event) =>
                setInviteDraft((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              required
            />
          </FormField>

          <FormField id="invite-role" label="Rol">
            <select
              className="cursor-pointer rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="invite-role"
              value={inviteDraft.role}
              onChange={(event) =>
                setInviteDraft((current) => ({
                  ...current,
                  role: event.target.value as UserRole,
                }))
              }
            >
              <option value="">Selecciona un Rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="STAFF">Colaborador</option>
              <option value="OWNER">Propietario</option>
            </select>
          </FormField>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={closeInviteModal}
            >
              Cancelar
            </Button>

            <Button type="submit">Guardar invitación</Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={isModalOpen}
        title="Editar usuario"
        onClose={closeCreateUserModal}
      >
        <form className="grid gap-4" onSubmit={handleUpdateUserSubmit}>
          <FormField id="user-name" label="Nombre">
            <input
              className="rounded-md border border-neutral-300 bg-neutral-200 px-3 py-2 text-neutral-600 cursor-not-allowed outline-none"
              id="user-name"
              value={userDraft.name}
              disabled
            />
          </FormField>

          <FormField id="user-email" label="Email">
            <input
              className="rounded-md border border-neutral-300 bg-neutral-200 px-3 py-2 text-neutral-600 cursor-not-allowed outline-none"
              id="user-email"
              type="email"
              value={userDraft.email}
              disabled
            />
          </FormField>

          <FormField id="user-role" label="Rol">
            <select
              className="cursor-pointer rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="user-role"
              value={userDraft.role}
              onChange={(event) =>
                setUserDraft((current) => ({
                  ...current,
                  role: event.target.value as UserRole,
                }))
              }
            >
              <option value="">Selecciona un Rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="STAFF">Colaborador</option>
              <option value="OWNER">Propietario</option>
            </select>
          </FormField>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={closeCreateUserModal}
            >
              Cancelar
            </Button>

            <Button type="submit">Guardar usuario</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
