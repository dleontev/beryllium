defmodule Backend.Auth.Enrollment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Enrollment


  @primary_key {:id, :binary_id, autogenerate: false}
  schema "enrollments" do
    field :userid, :binary_id
    field :sectionid, :binary_id
    field :roleid, :binary_id
  end

  @doc false
  def changeset(%Enrollment{} = enrollment, attrs) do
    enrollment
    |> cast(attrs, [])
    |> validate_required([])
  end
end
