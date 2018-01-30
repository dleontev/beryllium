defmodule Backend.Auth.Group do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Group

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "groups" do
    field(:name, :string, null: false)
    field(:groupset_id, :binary_id, null: false)
    field(:section_id, :binary_id, null: false)
    field(:max_members, :integer, null: false)
  end

  @doc false
  def changeset(%Group{} = group, attrs) do
    group
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:id)
  end
end
