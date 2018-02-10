defmodule Backend.Auth.Question do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Question


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "questions" do
    field(:assignment_id, :binary_id, null: false)
    field(:question, :string, null: false)
  end

  @doc false
  def changeset(%Question{} = question, attrs) do
    question
    |> cast(attrs, [:id, :assignment_id, :question])
    |> validate_required([:id, :assignment_id, :question])
  end
end
