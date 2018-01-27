defmodule Backend.Auth.Enrollment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Enrollment

  schema "enrollments" do
    field :user_id, :binary_id, null: false
    field :section_id, :binary_id, null: false
    field :role_id, :binary_id, null: false
  end

  @doc false
  def changeset(%Enrollment{} = enrollment, attrs) do
    enrollment
    |> cast(attrs, [])
    |> validate_required([])
  end
end
