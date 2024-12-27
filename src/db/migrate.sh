#!/bin/bash

# Elimina la carpeta de migraciones
rm -rf src/db/migrations

# Elimina la db
rm -rf src/db/template.db

# Genera una nueva migración
npx drizzle-kit generate

# Sincroniza la migración con la db
npx drizzle-kit migrate

# Envia los cambios del schema directo a la db
# npx drizzle-kit push