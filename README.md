
# Prueba Técnica Estudio Elefante

  

Este proyecto contiene un frontend en React (Vite) y un backend en Django.

  

## Requisitos

  

- Node.js y npm

- Python 3.10+

- PostgreSQL

  

---

  

## Instrucciones para iniciar el proyecto

  

### 1. Backend

  
  

#### Instalación

  

1. Navega a la carpeta del backend:

```bash

cd backend/rae_backend

```

2. Crea un entorno virtual (recomendado):

```bash

python -m venv .venv

```

3. Activa el entorno virtual:

- En Windows:

```bash

.venv\Scripts\activate

```

- En Mac/Linux:

```bash

source .venv/bin/activate

```

4. Instala las dependencias:

```bash

pip install -r requirements.txt

```

  

#### Configuración del archivo `.env`

  

En la raíz de `backend/rae_backend`, crea un archivo `.env` con el siguiente contenido (ajusta los valores según tu entorno):

  

```

GEMINI_API_KEY=tu_api_key_de_gemini

DB_NAME=nombre_de_tu_base_de_datos

DB_USER=usuario_de_postgres

DB_PASSWORD=contraseña_de_postgres

DB_HOST=localhost

DB_PORT=5432

```

  

#### Migraciones y ejecución

  

1. Aplica las migraciones:

```bash

python manage.py migrate

```

2. Inicia el servidor:

```bash

python manage.py runserver

```

  

El backend estará disponible en `http://localhost:8000`.

  

---

  

### 2. Frontend

  

#### Instalación

  

1. Navega a la carpeta del frontend:

```bash

cd frontend

```

2. Instala las dependencias:

```bash

npm install

```

  

#### Ejecución

  

1. Inicia el servidor de desarrollo:

```bash

npm run dev

```

  

El frontend estará disponible en `http://localhost:5173`.

  

---
  

> ***Prompt***:
Contexto institucional: Todos los Resultados de Aprendizaje Esperado en la universidad deben seguir la Taxonomía de Bloom y comenzar con un verbo en infinitivo de nivel superior (ej: Analizar, Evaluar, Crear). Deben ser centrados en el estudiante y evidenciables. Finalidad de la RAE: **Finalidad ingresada por el usuario final** Concepto a transformar en Resultado de Aprendizaje Esperado: **Concepto ingresado por el usuario final**

> ***Instrucciones de LLM***:
>  - Actúa como un pedagogo experto especializado en diseño instruccional y neuroeducación.
> - Debes generar un Resultado de Aprendizaje Esperado (RAE) claro, medible y observable
> - Tu objetivo es transformar conceptos complejos en experiencias de aprendizaje accesibles, utilizando el andamiaje cognitivo y fomentando el pensamiento crítico.
> - Prioriza siempre el aprendizaje activo y adapta tu lenguaje al nivel de comprensión del interlocutor.
> - Devolveme la respuesta en texto plano para leer en html (NO UTILIZAR MARKDOWN: ** , ##, etc.)
> - No incluyas una repregunta al final, ya que el usuario no podrá responderla.
