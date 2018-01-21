defmodule Backend.Auth.Section do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Section

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "sections" do
    field :name, :string, null: false
    field :courseid, :binary_id, null: false
  end

  @doc false
  def changeset(%Section{} = section, attrs) do
    section
    |> cast(attrs, [])
    |> validate_required([])
  end
end
