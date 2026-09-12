import { useEffect, useState, type FormEvent } from 'react'
import { Modal } from '../components/Modal'
import { Badge, Button, FormField, PageHeader } from '../components/ui'
import type { BusinessUser, Invitation, UserRole } from '../types'

interface UsersPageProps {
  users: BusinessUser[]
  invitations: Invitation[]
}

interface InviteDraft {
  email: string
  role: UserRole
}

interface UserDraft {
  name: string
  email: string
  role: UserRole
}

const emptyInviteDraft = (): InviteDraft => ({ email: '', role: 'EMPLOYEE' })
const emptyUserDraft = (): UserDraft => ({ name: '', email: '', role: 'EMPLOYEE' })

export function UsersPage({ users, invitations }: UsersPageProps) {
  const [userList, setUserList] = useState<BusinessUser[]>(users)
  const [invitationList, setInvitationList] = useState<Invitation[]>(invitations)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inviteDraft, setInviteDraft] = useState<InviteDraft>(emptyInviteDraft())
  const [userDraft, setUserDraft] = useState<UserDraft>(emptyUserDraft())

  useEffect(() => {
    setUserList(users)
    setInvitationList(invitations)
  }, [users, invitations])

  const openCreateUserModal = () => {
    setIsModalOpen(true)
  }

  const openEditUserModal = (user: BusinessUser) => {
    setUserDraft({
      name: user.name,
      email: user.email,
      role: user.role,
    })
    setIsModalOpen(true)
  }

  const closeInviteModal = () => {
    setInviteModalOpen(false)
    setInviteDraft(emptyInviteDraft())
  }

  const closeCreateUserModal = () => {
    setIsModalOpen(false)
    setUserDraft(emptyUserDraft())
  }

  const handleInviteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inviteDraft.email) return
    const nextInvitation: Invitation = {
      invitation_id: `inv-${Date.now()}`,
      email: inviteDraft.email,
      role: inviteDraft.role,
      status: 'PENDING',
    }
    setInvitationList((current) => [nextInvitation, ...current])
    closeInviteModal()
  }

  const handleCreateUserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userDraft.email || !userDraft.name) return
    const nextUser: BusinessUser = {
      user_id: `usr-${Date.now()}`,
      name: userDraft.name,
      email: userDraft.email,
      role: userDraft.role,
      active: true,
    }
    setUserList((current) => [nextUser, ...current])
    closeCreateUserModal()
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Colaboración"
        title="Usuarios e invitaciones"
        actions={
          <>
            <Button onClick={() => setInviteModalOpen(true)}>Invitar usuario</Button>
            <Button variant="secondary" onClick={openCreateUserModal}>Crear usuario</Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">Usuarios del negocio</h2>
          <ul className="grid gap-3">
            {userList.map((user) => (
              <li key={user.user_id} className="flex cursor-pointer items-center justify-between gap-3 rounded-md bg-neutral-50 p-3 hover:bg-neutral-100"
                  onClick={() => openEditUserModal(user)}>
                <div>
                  <strong className="block text-sm text-neutral-900">{user.name}</strong>
                  <small className="text-xs text-neutral-500">{user.email}</small>
                </div>
                <Badge>{user.role}</Badge>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">Invitaciones</h2>
          <ul className="grid gap-3">
            {invitationList.map((invitation) => (
              <li key={invitation.invitation_id} className="flex items-center justify-between gap-3 rounded-md bg-neutral-50 p-3">
                <div>
                  <strong className="block text-sm text-neutral-900">{invitation.email}</strong>
                  <small className="text-xs text-neutral-500">{invitation.role}</small>
                </div>
                <Badge variant={invitation.status === 'PENDING' ? 'warning' : 'neutral'}>{invitation.status}</Badge>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <Modal open={inviteModalOpen} title="Invitar usuario" onClose={closeInviteModal}>
        <form className="grid gap-4" onSubmit={handleInviteSubmit}>
          <FormField id="invite-email" label="Email">
            <input
              className="rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="invite-email"
              type="email"
              value={inviteDraft.email}
              onChange={(event) => setInviteDraft((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </FormField>
          <FormField id="invite-role" label="Rol">
            <select
              className="rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="invite-role"
              value={inviteDraft.role}
              onChange={(event) => setInviteDraft((current) => ({ ...current, role: event.target.value as UserRole }))}
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={closeInviteModal}>Cancelar</Button>
            <Button type="submit">Guardar invitación</Button>
          </div>
        </form>
      </Modal>

      <Modal open={isModalOpen} title="Crear usuario" onClose={() => setIsModalOpen(false)}>
        <form className="grid gap-4" onSubmit={handleCreateUserSubmit}>
          <FormField id="user-name" label="Nombre">
            <input
              className="rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="user-name"
              value={userDraft.name}
              onChange={(event) => setUserDraft((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </FormField>
          <FormField id="user-email" label="Email">
            <input
              className="rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="user-email"
              type="email"
              value={userDraft.email}
              onChange={(event) => setUserDraft((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </FormField>
          <FormField id="user-role" label="Rol">
            <select
              className="rounded-md border border-neutral-200 px-3 py-2 outline-none transition focus:border-primary-500"
              id="user-role"
              value={userDraft.role}
              onChange={(event) => setUserDraft((current) => ({ ...current, role: event.target.value as UserRole }))}
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </FormField>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={closeCreateUserModal}>Cancelar</Button>
            <Button type="submit">Guardar usuario</Button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
