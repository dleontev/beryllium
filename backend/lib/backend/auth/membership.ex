defmodule Backend.Auth.Membership do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Membership

  schema "memberships" do
    field :userid, :binary_id
    field :groupid, :binary_id
  end

  @doc false
  def changeset(%Membership{} = memberships, attrs) do
    memberships
    |> cast(attrs, [])
    |> validate_required([])
  end
end
