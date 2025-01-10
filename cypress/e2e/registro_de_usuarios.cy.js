// Archivo: registro_de_usuarios.cy.js

// Inicia la descripción del conjunto de pruebas relacionadas al registro de usuarios
describe('Registro de Usuario', () => {
  // Define la URL base del formulario de registro
  const baseUrl = 'https://test-qa.inlaze.com/auth/sign-up';

  // Antes de cada prueba, se realiza la visita al formulario de registro
  beforeEach(() => {
    cy.visit(baseUrl); // Navega a la página de registro
  });

  // Caso de prueba 1: Registrar un usuario con datos válidos
  it('1. Registrar un usuario con nombre, email y contraseña válidos', () => {
    cy.get('input[id="full-name"]').type('Juan Perez'); // Escribe un nombre completo en el campo de nombre
    cy.get('input[id="email"]').type(`usuario${Date.now()}@ejemplo.com`); // Escribe un email único utilizando la marca de tiempo actual
    cy.get('input[id="password"]').type('Password123!'); // Escribe una contraseña válida
    cy.get('input[id="confirm-password"]').type('Password123!'); // Confirma la contraseña válida
    cy.get('button[type="submit"]').click(); // Hace clic en el botón de envío del formulario
  });

  // Caso de prueba 2: Validar que el campo nombre acepte al menos dos palabras
  it('2. Validar que el campo nombre acepte mínimo 2 palabras', () => {
    cy.get('input[id="full-name"]').type('Juan'); // Ingresa solo un nombre en el campo de nombre
    cy.get('input[id="email"]').type(`test${Date.now()}@mail.com`); // Ingresa un email único
    cy.get('input[id="password"]').type('Password123!'); // Ingresa una contraseña válida
    cy.get('input[id="confirm-password"]').type('Password123!'); // Confirma la contraseña
    cy.get('button[type="submit"]').click({force: true}); // Intenta enviar el formulario aunque el nombre es incorrecto
  });

  // Caso de prueba 3: Verificar que el email tenga formato estándar y sea único
  it('3. Verificar que el email cumpla con el formato estándar y sea único', () => {
    cy.get('input[id="full-name"]').type('Pedro Gomez'); // Escribe un nombre válido
    cy.get('input[id="email"]').type('usuario_invalido'); // Ingresa un email con formato inválido
    cy.get('input[id="password"]').type('Password123!'); // Ingresa una contraseña válida
    cy.get('input[id="confirm-password"]').type('Password123!'); // Confirma la contraseña
    cy.get('button[type="submit"]').click({force: true}); // Intenta enviar el formulario con email inválido

    cy.get('input[id="email"]').clear().type('usuario_existente@ejemplo.com'); // Limpia el campo de email y prueba con un email ya registrado
    cy.get('button[type="submit"]').click({force: true}); // Intenta enviar nuevamente con un email ya existente
  });

  // Caso de prueba 4: Validar que la contraseña cumpla con los requisitos de seguridad
  it('4. Validar que la contraseña cumpla con requisitos de longitud y caracteres', () => {
    cy.get('input[id="full-name"]').type('Ana Maria'); // Ingresa un nombre válido
    cy.get('input[id="email"]').type(`unique${Date.now()}@mail.com`); // Ingresa un email único
    cy.get('input[id="password"]').type('12345q'); // Ingresa una contraseña débil (demasiado corta)
    cy.get('input[id="confirm-password"]').type('12345q'); // Confirma la contraseña débil
    cy.get('button[type="submit"]').click({force: true}); // Intenta enviar el formulario con la contraseña débil
  });

  // Caso de prueba 5: Verificar que el formulario no se envíe si faltan campos obligatorios
  it('5. Comprobar que el formulario no se envíe si los campos obligatorios no están completos', () => {
    cy.get('input[id="full-name"]').type('Carlos Martinez'); // Ingresa un nombre válido
    cy.get('input[id="email"]').clear(); // Deja el campo de email vacío
    cy.get('input[id="password"]').type('Password123!'); // Ingresa una contraseña válida
    cy.get('input[id="confirm-password"]').type('Password123!'); // Confirma la contraseña
    cy.get('button[type="submit"]').click({force: true}); // Intenta enviar el formulario con el campo de email vacío
  });

  // Caso de prueba 6: Verificar que el sistema muestre un mensaje de error si las contraseñas no coinciden
  it('6. Verificar que el sistema informe si las contraseñas no coinciden', () => {
    cy.get('input[id="full-name"]').type('Maria Lopez'); // Ingresa un nombre válido
    cy.get('input[id="email"]').type(`test${Date.now()}@ejemplo.com`); // Ingresa un email único
    cy.get('input[id="password"]').type('Password123!'); // Ingresa una contraseña válida
    cy.get('input[id="confirm-password"]').type('Diferente456!'); // Ingresa una contraseña de confirmación diferente
    cy.get('button[type="submit"]').click({force: true}); // Intenta enviar el formulario con contraseñas que no coinciden
  });
});
