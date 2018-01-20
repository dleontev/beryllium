defmodule Backend.Auth.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Post

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "posts" do
    field :userid, :binary_id
    field :parentid, :binary_id
    field :content, :string
    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [])
    |> validate_required([])
  end
end
