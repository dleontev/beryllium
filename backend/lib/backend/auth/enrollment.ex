defmodule Backend.Auth.Enrollment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Enrollment

  schema "enrollments" do
    field :userid, :binary_id, null: false
    field :sectionid, :binary_id, null: false
    field :roleid, :binary_id, null: false
  end

  @doc false
  def changeset(%Enrollment{} = enrollment, attrs) do
    enrollment
    |> cast(attrs, [])
    |> validate_required([])
  end
end
