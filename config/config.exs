# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :pleague,
  ecto_repos: [Pleague.Repo]

# Configures the endpoint
config :pleague, PleagueWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "mbm/2iDI/V7JO8y2YVBdZi86HxRGm20RH0eOlQMkm75PeQkxdOEXRsQ8quW8c2AG",
  render_errors: [view: PleagueWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Pleague.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
