import admin, { type ServiceAccount } from 'firebase-admin'
import { envVars } from '../config'

const serviceAccount = {
  type: envVars.FIREBASE_ADMIN_TYPE,
  project_id: envVars.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: envVars.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: envVars.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: envVars.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: envVars.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: envVars.FIREBASE_ADMIN_AUTH_URI,
  token_uri: envVars.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    envVars.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: envVars.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  universe_domain: envVars.FIREBASE_ADMIN_UNIVERSE_DOMAIN
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

export default admin
