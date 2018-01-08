defmodule Backend.User do
    use Ecto.Schema
    @primary_key {:userid, :id, autogenerate: true}
    schema "users" do
      field :name, :string
    end
  end