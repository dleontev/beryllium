defmodule Backend.Auth.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Post


  schema "posts" do
    field :userid, :binary_id, null: false
    field :parentid, :binary_id
    field :content, :string, null: false
    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [])
    |> validate_required([])
  end
end
