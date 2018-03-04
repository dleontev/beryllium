defmodule Backend.Auth.Grade do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Grade

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "grades" do
    field(:submission_id, :binary_id, null: false)
    field(:earned_points, :float, null: false)
  end

  @doc false
  def changeset(%Grade{} = grade, attrs) do
    grade
    |> cast(attrs, [:id, :submission_id, :binary_id])
    |> validate_required([:id, :submission_id])
  end
end
