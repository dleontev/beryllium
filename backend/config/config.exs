# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :backend,
  ecto_repos: [Backend.Repo]

# Configures the endpoint
config :backend, BackendWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "oEuIfvInPXWh8FlHkBx4D3cckr4GJWTpuMC5DXATjx2m4rOwSE0pNKOYO+9t9gMK",
  render_errors: [view: BackendWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Backend.PubSub,
  adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configures Guardian
config :guardian, Guardian,
  issuer: "Backend",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Backend.GuardianSerializer,
  secret_key: "ZZIDKx7JZI1H0e5ZKv4rynC6ZR3QJgCJ+zv2utbb4couDzeFotU1GAKv46WmkICR"