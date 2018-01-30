defmodule Backend.Auth.Course do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Course

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "courses" do
    field(:name, :string, null: false)
    field(:school_id, :binary_id, null: false)
    field(:code, :string, null: false)
    field(:start_date, :utc_datetime)
    field(:end_date, :utc_datetime)
  end

  @doc false
  def changeset(%Course{} = course, attrs) do
    course
    |> cast(attrs, [])
    |> validate_required([])
    |> unique_constraint(:id)
  end
end
