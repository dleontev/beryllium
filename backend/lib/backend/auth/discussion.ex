defmodule Backend.Auth.Discussion do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Discussion

  schema "discussions" do
    field :sectionid, :binary_id, null: false
    field :postid, :binary_id, null: false
    field :title, :string, null: false
  end

  @doc false
  def changeset(%Discussion{} = discussion, attrs) do
    discussion
    |> cast(attrs, [])
    |> validate_required([])
  end
end
