defmodule Backend.Auth.Announcement do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Announcement

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "announcements" do
    field :sectionid, :binary_id
    field :postid, :binary_id
    field :title, :string
  end

  @doc false
  def changeset(%Announcement{} = announcement, attrs) do
    announcement
    |> cast(attrs, [])
    |> validate_required([])
  end
end
