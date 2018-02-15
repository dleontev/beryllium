defmodule Backend.Auth.Section do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Section

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "sections" do
    field(:name, :string, null: false)
    field(:course_id, :binary_id, null: false)
    field(:homepage_id, :binary_id, null: false)
    field(:finished, :boolean, null: false)
    field(:published, :boolean, null: false)
  end

  @doc false
  def changeset(%Section{} = section, attrs) do
    section
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:id)
  end
end
