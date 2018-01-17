defmodule Backend.Auth.Group do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Group

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "groups" do
    field :name, :string
    field groupsetid, :binary_id
  end

  @doc false
  def changeset(%Group{} = group, attrs) do
    group
    |> cast(attrs, [])
    |> validate_required([])
  end
end
