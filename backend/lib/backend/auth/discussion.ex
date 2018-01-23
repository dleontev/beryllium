defmodule Backend.Auth.Discussion do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Discussion

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "discussions" do
    field :sectionid, :binary_id, null: false
    field :postid, :binary_id, null: false
    field :title, :string, null: false
    field :is_discussion, :boolean, null: false
  end

  @doc false
  def changeset(%Discussion{} = discussion, attrs) do
    discussion
    |> cast(attrs, [:id, :sectionid, :postid, :title, :is_discussion])
    |> validate_required([:id, :sectionid, :postid, :title, :is_discussion])
  end
end
