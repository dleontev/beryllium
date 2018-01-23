defmodule Backend.Auth.Announcement do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Announcement

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "announcements" do
    field :sectionid, :binary_id, null: false
    field :postid, :binary_id, null: false
    field :title, :string, null: false
    field :is_discussion, :boolean, null: false
  end

  @doc false
  def changeset(%Announcement{} = announcement, attrs) do
    announcement
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:id)
  end
end
