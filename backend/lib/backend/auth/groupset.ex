defmodule Backend.Auth.Groupset do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Groupset

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "groupsets" do
    field :courseid, :binary_id
    field :name, :string
  end

  @doc false
  def changeset(%Groupset{} = groupset, attrs) do
    groupset
    |> cast(attrs, [])
    |> validate_required([])
  end
end
