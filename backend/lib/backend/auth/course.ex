defmodule Backend.Auth.Course do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Course


  @primary_key {:id, :binary_id, autogenerate: false}
  schema "courses" do
    field :name, :string
    field :schoolid, :binary_id
    field :code, :string
    field :start_date, :utc_datetime
    field :end_date, :utc_datetime
    field :visible, :boolean
  end

  @doc false
  def changeset(%Course{} = course, attrs) do
    course
    |> cast(attrs, [])
    |> validate_required([])
  end
end
