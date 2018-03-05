defmodule Backend.Auth.Grade do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Grade

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "grades" do
    field(:submission_id, :binary_id, null: false)
    field(:points_earned, :float, null: false)
  end

  @doc false
  def changeset(%Grade{} = grade, attrs) do
    grade
    |> cast(attrs, [:id, :submission_id, :points_earned])
    |> validate_required([:id, :submission_id])
  end
end
