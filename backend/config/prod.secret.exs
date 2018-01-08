use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :backend, BackendWeb.Endpoint,
  secret_key_base: "G/6gHGb5qJznLgA4axVLTXwczr2kxTjBP+Qs5lxGTT7FVQgDf/xvxEbPgMA8qQ6O"

# Configure your database
config :backend, Backend.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "backend_prod",
  pool_size: 15
