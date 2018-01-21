defmodule Backend.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.User


  @primary_key {:id, :binary_id, autogenerate: false}
  schema "users" do
    field :email, :string, null: false
    field :first_name, :string, null: false
    field :middle_name, :string, null: false
    field :last_name, :string, null: false
    field :password, :string, null: false
	  field :entered_password, :string, virtual: true
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:id, :email, :first_name, :middle_name, :last_name, :password])
    |> validate_required([:id, :email, :first_name, :middle_name, :last_name, :password])
	  |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> unique_constraint(:id)
  end
  
end
