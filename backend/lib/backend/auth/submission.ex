defmodule Backend.Auth.Submission do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Submission

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "submissions" do
    field(:assignment_id, :binary_id, null: false)
    field(:user_id, :binary_id, null: false)
    field(:group_id, :binary_id)
    field(:file_id, :binary_id)
    field(:text_entry, :string)
    timestamps()
  end

  @doc false
  def changeset(%Submission{} = submission, attrs) do
    submission
    |> cast(attrs, [:id, :assignment_id, :user_id, :group_id, :file_id, :text_entry])
    |> validate_required([:id, :assignment_id, :user_id])
  end
end
