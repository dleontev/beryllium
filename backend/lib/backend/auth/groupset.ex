defmodule Backend.Auth.Groupset do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Groupset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "groupsets" do
    field(:section_id, :binary_id, null: false)
    field(:name, :string, null: false)
    field(:is_selfsignup, :boolean, null: false)
  end

  @doc false
  def changeset(%Groupset{} = groupset, attrs) do
    groupset
    |> cast(attrs, [:section_id, :name, :is_selfsignup])
    |> validate_required([:section_id, :name, :is_selfsignup])
  end
end
