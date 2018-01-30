defmodule Backend.Auth.Membership do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Membership

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "memberships" do
    field(:user_id, :binary_id, null: false)
    field(:group_id, :binary_id, null: false)
    field(:section_id, :binary_id, null: false)
  end

  @doc false
  def changeset(%Membership{} = memberships, attrs) do
    memberships
    |> cast(attrs, [])
    |> validate_required([])
  end
end
