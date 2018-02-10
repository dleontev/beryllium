defmodule Backend.Auth.Quiz do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Quiz

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "quizzes" do
    field(:assignment_id, :binary_id, null: false)
    field(:max_attempts, :integer)
    field(:current_attempts, :integer)
    field(:show_answers, :boolean)
    field(:keep_highest, :boolean)
  end

  @doc false
  def changeset(%Quiz{} = quiz, attrs) do
    quiz
    |> cast(attrs, [:id, :assignment_id, :max_attempts, :current_attempts, :show_answers, :keep_highest])
    |> validate_required([:id, :assignment_id])
  end
end
