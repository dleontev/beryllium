defmodule Backend.Auth.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Post

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "posts" do
    field(:user_id, :binary_id, null: false)
    field(:parent_id, :binary_id)
    field(:content, :string, null: false)
    field(:discussion_id, :binary_id, null: false)
    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:id, :user_id, :parent_id, :content, :discussion_id])
    |> validate_required([:user_id, :content, :discussion_id])
  end
end
