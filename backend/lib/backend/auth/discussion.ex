defmodule Backend.Auth.Discussion do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Discussion

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "discussions" do
    field(:section_id, :binary_id, null: false)
    field(:title, :string, null: false)
    field(:is_discussion, :boolean, null: false)
    field(:is_locked, :boolean, null: false)
    field(:is_pinned, :boolean, null: false)
  end

  @doc false
  def changeset(%Discussion{} = discussion, attrs) do
    discussion
    |> cast(attrs, [:id, :section_id, :title, :is_discussion, :is_locked, :is_pinned])
    |> validate_required([:id, :section_id, :title, :is_discussion])
  end
end
