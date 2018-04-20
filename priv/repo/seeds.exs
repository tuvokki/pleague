# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pleague.Repo.insert!(%Pleague.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Pleague.Data do
  alias Pleague.Repo
  alias Pleague.Accounts
  alias Pleague.Accounts.User
  alias Pleague.Accounts.Credential

  IO.puts("Generating data")

  user =
    Repo.insert!(%User{
      name: "Rainbow Trout",
      username: "rainbow"
      # credential: credential.id
    })

  credential =
    Repo.insert!(%Credential{
      email: "rainbow@trout.com",
      user_id: user.id
    })
end
