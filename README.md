# VANTOR V12

Web conceptual de automoción con un coche deportivo V12 en 3D, cuya cámara se anima con el scroll. Es un **proyecto ficticio** de portfolio: el producto, las cifras, los precios y los datos de contacto no son reales.

**Demo:** https://vantor-v12.vercel.app

<!-- CAPTURA: añade aquí una imagen de la portada cuando la tengas, por ejemplo ![Portada](docs/portada.webp) -->

## Qué incluye

- Escena 3D con un coche V12 y cámara controlada por el scroll.
- Secciones: Diseño, Prestaciones, Especificaciones, Detalles y Contacto.
- Formulario de contacto **simulado**: no envía ni guarda ningún dato.
- Modo debug con paneles de ajuste (cámara, luces y coche), que solo se activa añadiendo `?debug=1` a la dirección.

## Tecnologías

- [Next.js](https://nextjs.org) 16 y React
- [three](https://threejs.org), [@react-three/fiber](https://r3f.docs.pmnd.rs) y [@react-three/drei](https://github.com/pmndrs/drei)
- [leva](https://github.com/pmndrs/leva) (paneles de debug) y [zustand](https://github.com/pmndrs/zustand) (estado)
- TypeScript

## Cómo ejecutarlo en local

Necesitas [Node.js](https://nodejs.org) instalado.

```bash
npm install
npm run dev
```

Abre http://localhost:3000 en el navegador.

Para probar la versión de producción:

```bash
npm run build
npm run start
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Sirve la versión compilada |
| `npm run lint` | Revisa el código con ESLint |

## Créditos

- Modelo 3D generado con [Tripo AI](https://www.tripo3d.ai), a partir de una imagen creada con Gemini.

## Autor

Izan Hernández ([@izanhg2411](https://github.com/izanhg2411)), proyecto realizado durante los estudios de DAW.