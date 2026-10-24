import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FormField } from '../components/ui'
import { apiService } from '../services/apiService'
import MapPicker from '../components/ui/MapPicker'

type UserForm = { name: string; email: string; phone: string; password: string }
type BusinessForm = { name: string; mobile: string; email: string; address: string }

export const RegisterPage = () => {
  const DEFAULT_CENTER: [number, number] = [4.8778, -72.8989];
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'business'>('email')
  const [existingUser, setExistingUser] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [userForm, setUserForm] = useState<UserForm>({ name: '', email: '', phone: '', password: '' })
  const [businessForm, setBusinessForm] = useState<BusinessForm>({ name: '', mobile: '', email: '', address: '' })
  const [location, setLocation] = useState<[number, number]>(DEFAULT_CENTER);
  const [hasSelectedLocation, setHasSelectedLocation] = useState(false)

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserForm((current) => ({ ...current, [name]: value }))
  }

  const handleBusinessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBusinessForm((current) => ({ ...current, [name]: value }))
  }

  const handleUseCurrentLocation = () => {
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no permite obtener la ubicación. Puedes mover el marcador manualmente.')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation([coords.latitude, coords.longitude])
        setHasSelectedLocation(true)
        setIsLocating(false)
      },
      (geolocationError) => {
        setLocationError(
          geolocationError.code === geolocationError.PERMISSION_DENIED
            ? 'No se concedió el permiso de ubicación. Puedes mover el marcador manualmente.'
            : 'No pudimos obtener tu ubicación. Puedes mover el marcador manualmente.',
        )
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleLocationChange = (nextLocation: [number, number]) => {
    setLocation(nextLocation)
    setHasSelectedLocation(true)
    setLocationError(null)
  }

  const handleEmailSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const result = await apiService.checkBusinessRegistrationEmail(userForm.email)
      setExistingUser(result.exists)
      setStep('business')
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setLocation([pos.coords.latitude, pos.coords.longitude]),
          () => console.log("GPS denegado, usando ubicación predeterminada.")
        );
      }    
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo validar el email.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      if (!hasSelectedLocation) {
        throw new Error('Por favor, selecciona la ubicación de tu negocio en el mapa.')
      }
      await apiService.registerBusiness({
        user: userForm,
        business: {
          ...businessForm,
          latitude: location[0].toString(),
          longitude: location[1].toString(),
        },
      })
      navigate('/business/login')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo registrar el negocio.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 p-6">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-600">FastTeat</span>
          <h1 className="text-3xl font-bold text-neutral-900">Registra tu negocio para iniciar a vender</h1>
          <p className="text-sm text-neutral-500">{step === 'email' ? 'Primero validaremos el email del usuario propietario.' : 'Completa la información de tu negocio.'}</p>
        </div>

        {step === 'email' ? (
          <form className="grid gap-4" onSubmit={handleEmailSubmit}>
            <FormField id="email" label="Email del usuario">
              <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="email" name="email" type="email" value={userForm.email} onChange={handleUserChange} placeholder="manager@fastteat.com" required />
            </FormField>
            {error ? <p className="rounded-md bg-danger-50 px-3 py-2 text-sm text-danger-600" role="alert">{error}</p> : null}
            <Button className="mt-2" size="lg" type="submit" disabled={isLoading}>{isLoading ? 'Validando...' : 'Continuar'}</Button>
          </form>
        ) : (
          <form className="grid gap-4" onSubmit={handleRegister}>
            <p className="rounded-md bg-primary-50 px-3 py-2 text-sm text-primary-700">{existingUser ? 'Encontramos tu usuario. Se asociará como propietario del negocio.' : 'No encontramos el email. Crea los datos de tu usuario para continuar.'}</p>

            {!existingUser ? (
              <>
                <FormField id="name" label="Nombre del usuario">
                  <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="name" name="name" value={userForm.name} onChange={handleUserChange} required />
                </FormField>
                <FormField id="phone" label="Teléfono del usuario">
                  <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="phone" name="phone" value={userForm.phone} onChange={handleUserChange} required />
                </FormField>
                <FormField id="password" label="Contraseña">
                  <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="password" name="password" type="password" value={userForm.password} onChange={handleUserChange} required />
                </FormField>
              </>
            ) : null}

            <FormField id="business-name" label="Nombre del negocio">
              <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="business-name" name="name" value={businessForm.name} onChange={handleBusinessChange} required />
            </FormField>
            <FormField id="business-email" label="Email del negocio">
              <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="business-email" name="email" type="email" value={businessForm.email} onChange={handleBusinessChange} required />
            </FormField>
            <FormField id="business-mobile" label="Número del negocio">
              <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="business-mobile" name="mobile" value={businessForm.mobile} onChange={handleBusinessChange} required />
            </FormField>
            <FormField id="business-address" label="Dirección">
              <input className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500" id="business-address" name="address" value={businessForm.address} onChange={handleBusinessChange} />
            </FormField>

            <section className="grid gap-3 border-t border-neutral-100 pt-5" aria-labelledby="business-location-title">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h2 id="business-location-title" className="text-sm font-semibold text-neutral-800">Ubicación exacta</h2>
                  <p className="text-sm text-neutral-500">Usa tu ubicación actual para centrar el mapa o mueve el marcador hasta tu negocio.</p>
                </div>
                {(!hasSelectedLocation) && (
                <Button className="shrink-0 self-start" type="button" variant="secondary" size="sm" onClick={handleUseCurrentLocation} disabled={isLocating || isLoading}>
                  {isLocating ? 'Buscando...' : 'Usar mi ubicación'}
                </Button>
                )}
              </div>
              {locationError ? <p className="text-sm text-danger-600" role="alert">{locationError}</p> : null}
              <div className="overflow-hidden rounded-lg border border-neutral-200 shadow-sm ring-1 ring-black/5">
                <MapPicker value={location} onChange={handleLocationChange} height="350px" />
              </div>
            </section>

            {error ? <p className="rounded-md bg-danger-50 px-3 py-2 text-sm text-danger-600" role="alert">{error}</p> : null}
            <div className="flex gap-3">
              <Button type="button" variant="secondary" onClick={() => setStep('email')} disabled={isLoading}>Atrás</Button>
              <Button className="flex-1" size="lg" type="submit" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrar negocio'}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}