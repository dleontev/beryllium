defmodule BackendWeb.SubmissionView do
  use BackendWeb, :view
  alias BackendWeb.SubmissionView

  def render("index.json", %{submissions: submissions}) do
    %{data: render_many(submissions, SubmissionView, "submission.json")}
  end

  def render("show.json", %{submission: submission}) do
    %{data: render_one(submission, SubmissionView, "submission.json")}
  end

  def render("show_by_assignment.json", %{submissions: submissions}) do
    %{data: render_many(submissions, SubmissionView, "submission_by_assignment.json")}
  end

  def render("submission_by_assignment.json", %{submission: submission}) do
    %{
      id: submission.id,
      user_name: submission.user_name,
      user_id: submission.user_id,
      file_id: submission.file_id,
      group_id: submission.group_id,
      text_entry: submission.text_entry,
      inserted_at: submission.inserted_at,
      updated_at: submission.updated_at,
      points_possible: submission.points_possible,
      points_earned: submission.points_earned
    }
  end

  def render("show_count.json", %{submission: submission}) do
    %{data: render_one(submission, SubmissionView, "submission_count.json")}
  end

  def render("submission.json", %{submission: submission}) do
    %{
      id: submission.id,
      user_id: submission.user_id,
      assignment_id: submission.assignment_id,
      file_id: submission.file_id,
      group_id: submission.group_id,
      text_entry: submission.text_entry,
      inserted_at: submission.inserted_at,
      updated_at: submission.updated_at
    }
  end

  def render("submission_count.json", %{submission: count}) do
    [head | _] = count
    %{
      count: head.submission_count
    }
  end
end
