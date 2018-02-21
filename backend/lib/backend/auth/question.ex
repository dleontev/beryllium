defmodule Backend.Auth.Question do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Question


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "questions" do
    field(:quiz_id, :binary_id, null: false)
    field(:question, :string, null: false)
    field(:a1, :string, null: false)
    field(:a2, :string, null: false)
    field(:a3, :string)
    field(:a4, :string)
    field(:a5, :string)
    field(:correct_answer, :string, null: false)
  end

  @doc false
  def changeset(%Question{} = question, attrs) do
    question
    |> cast(attrs, [:id, :quiz_id, :question, :a1, :a2, :a3, :a4, :a5, :correct_answer])
    |> validate_required([:id, :quiz_id, :question, :a1, :a2, :correct_answer])
  end
end
