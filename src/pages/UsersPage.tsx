import { useEffect, useState, type FormEvent } from 'react'
import { Modal } from '../components/Modal'
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Colaboración</span>
          <h2 className="text-2xl font-bold text-slate-900">Usuarios e invitaciones</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setInviteModalOpen(true)} className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700">
            Invitar usuario
          </button>
          <button onClick={() => openCreateUserModal()} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            Crear usuario
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Usuarios del negocio</h3>
          <ul className="grid gap-3">
            {userList.map((user) => (
              <li key={user.user_id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 cursor-pointer hover:bg-slate-100" 
                  onClick={() => openEditUserModal(user)}>
                <div>
                  <strong className="block text-sm text-slate-900">{user.name}</strong>
                  <small className="text-xs text-slate-500">{user.email}</small>
                </div>
                <span className="text-xs font-semibold text-slate-700">{user.role}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Invitaciones</h3>
          <ul className="grid gap-3">
            {invitationList.map((invitation) => (
              <li key={invitation.invitation_id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                <div>
                  <strong className="block text-sm text-slate-900">{invitation.email}</strong>
                  <small className="text-xs text-slate-500">{invitation.role}</small>
                </div>
                <span className="text-xs font-semibold text-slate-700">{invitation.status}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <Modal open={inviteModalOpen} title="Invitar usuario" onClose={closeInviteModal}>
        <form className="grid gap-4" onSubmit={handleInviteSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Email</span>
            <input
              className="rounded-xl border border-slate-200 px-3 py-2"
              type="email"
              value={inviteDraft.email}
              onChange={(event) => setInviteDraft((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Rol</span>
            <select
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={inviteDraft.role}
              onChange={(event) => setInviteDraft((current) => ({ ...current, role: event.target.value as UserRole }))}
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={closeInviteModal} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700">
              Cancelar
            </button>
            <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">
              Guardar invitación
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={isModalOpen} title="Crear usuario" onClose={() => setIsModalOpen(false)}>
        <form className="grid gap-4" onSubmit={handleCreateUserSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Nombre</span>
            <input
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={userDraft.name}
              onChange={(event) => setUserDraft((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Email</span>
            <input
              className="rounded-xl border border-slate-200 px-3 py-2"
              type="email"
              value={userDraft.email}
              onChange={(event) => setUserDraft((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Rol</span>
            <select
              className="rounded-xl border border-slate-200 px-3 py-2"
              value={userDraft.role}
              onChange={(event) => setUserDraft((current) => ({ ...current, role: event.target.value as UserRole }))}
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={closeCreateUserModal} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700">
              Cancelar
            </button>
            <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">
              Guardar usuario
            </button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
