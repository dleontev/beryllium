defmodule Backend.Auth.Enrollment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Enrollment

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "enrollments" do
    field(:user_id, :binary_id, null: false)
    field(:section_id, :binary_id, null: false)
    field(:role, :string, null: false)
  end

  @doc false
  def changeset(%Enrollment{} = enrollment, attrs) do
    enrollment
    |> cast(attrs, [])
    |> validate_required([])
  end
end
