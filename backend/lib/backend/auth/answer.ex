defmodule Backend.Auth.Answer do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Answer

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "answers" do
    field(:question_id, :binary_id, null: false)
    field(:answer, :string, null: false)
    field(:is_correct, :boolean)
  end

  @doc false
  def changeset(%Answer{} = answer, attrs) do
    answer
    |> cast(attrs, [:id, :question_id, :answer, :is_correct])
    |> validate_required([:id, :question_id, :answer])
  end
end
