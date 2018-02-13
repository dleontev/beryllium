defmodule Backend.Auth.Page do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Page

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "pages" do
    field(:title, :string, null: false)
    field(:content, :string, null: false)
    field(:section_id, :binary_id, null: false)
  end

  @doc false
  def changeset(%Page{} = page, attrs) do
    page
    |> cast(attrs, [])
    |> validate_required([])
  end
end
