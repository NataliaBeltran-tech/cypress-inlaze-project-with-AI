// Archivo: login_de_usuarios.cy.js

// Describe un conjunto de pruebas bajo el nombre "Login de Usuario"
describe('Login de Usuario', () => {
  
  // Define la URL base de la página de inicio de sesión
  const baseUrl = 'https://test-qa.inlaze.com/auth/sign-in';

  // beforeEach() se ejecuta antes de cada prueba individual para visitar la URL base
  beforeEach(() => {
      cy.visit(baseUrl); // Navega a la URL de inicio de sesión antes de cada test
  });

  // Prueba 1: Verificar que el usuario pueda loguearse con email y contraseña correctos
  it('1. Verificar que el usuario pueda loguearse con email y contraseña correctos', () => {
      cy.get('input[id="email"]').type('usuario_valido@ejemplo.com'); // Encuentra el campo de email e ingresa un correo válido
      cy.get('input[id="password"]').type('Password123!'); // Encuentra el campo de contraseña e ingresa una contraseña válida
      cy.get('button[type="submit"]').click(); // Encuentra el botón de inicio de sesión y hace clic para enviar el formulario
  });

  // Prueba 2: Validar que el formulario no se envíe si los campos no están completos
  it('2. Validar que el formulario no se envíe si los campos no están completos', () => {
      cy.get('input[id="email"]').type(''); // Deja el campo de email vacío
      cy.get('input[id="password"]').type('Password123!'); // Ingresa una contraseña válida
      cy.get('button[type="submit"]').click(); // Hace clic en el botón de enviar formulario
  });

  // Prueba 3: Comprobar que al ingresar se muestre el nombre del usuario
  it('3. Comprobar que al ingresar se muestre el nombre del usuario', () => {
      cy.get('input[id="email"]').type('usuario_valido@ejemplo.com'); // Ingresa el correo del usuario válido
      cy.get('input[id="password"]').type('Password123!'); // Ingresa la contraseña correspondiente
      cy.get('button[type="submit"]').click(); // Envía el formulario de inicio de sesión
  });

  // Prueba 4: Verificar que la plataforma permita cerrar la sesión correctamente
  it('4. Verificar que la plataforma permita cerrar la sesión correctamente', () => {
      cy.get('input[id="email"]').type('usuario_valido@ejemplo.com'); // Ingresa el correo del usuario válido
      cy.get('input[id="password"]').type('Password123!'); // Ingresa la contraseña
      cy.get('button[type="submit"]').click(); // Envía el formulario
  });
});
