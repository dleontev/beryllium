defmodule Backend.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.User


  @primary_key {:id, :binary_id, autogenerate: false}
  schema "users" do
    field :email, :string
    field :first_name, :string
    field :middle_name, :string
    field :last_name, :string
    field :time_zone, :integer
    field :password, :string
    #timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:id, :email, :first_name, :middle_name, :last_name, :time_zone, :password])
    |> validate_required([:id, :email, :first_name, :last_name, :password])
  end
end