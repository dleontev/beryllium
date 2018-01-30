defmodule Backend.Auth.School do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.School

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "schools" do
    field(:name, :string, null: false)
    field(:time_zone, :integer, null: false)
  end

  @doc false
  def changeset(%School{} = school, attrs) do
    school
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:id)
  end
end
