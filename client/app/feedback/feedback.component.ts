import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FeedbackService } from './services/feedback.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  customerId: string;
  customer: any;
  questions: any[];
  questionsForm: FormGroup;
  loading = false;
  notAvailable = false;
  sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private dialog: MdDialog,
              private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.customerId = params['customerId'];

      if (!this.customerId) {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Feedback failure',
            message: 'Invalid url'
          }
        });
      } else {
        this.getCustomer();
        this.getQuestions();
      }
    })
  }

  createForm() {
    let questionControls = [];

    this.questions.forEach(question => {
      questionControls.push(this.fb.group({
        question: question.text,
        answer: 10
      }));
    });

    this.questionsForm = this.fb.group({
      questions: this.fb.array(questionControls)
    });

  }

  getCustomer() {
    this.feedbackService.getCustomer(this.customerId)
      .subscribe(data => {
        this.customer = data;
      }, err => {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Feedback failure',
            message: err.message
          }
        });
        this.notAvailable = true;
      })
  }

  getQuestions() {
    this.feedbackService.getQuestions()
      .subscribe(data => {
        this.questions = data;

        this.createForm();
      })
  }

  submit(data) {
    this.loading = true;
    const requestData = {customerId: this.customerId, questions: data.questions};
    this.feedbackService.leaveFeedback(requestData)
      .subscribe(res => {
        this.loading = false;
        this.notAvailable = true;

        this.dialog.open(DialogComponent, {
          data: {
            title: 'Feedback success',
            message: res.message
          }
        })
      }, err => {
        this.loading = false;
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Feedback failure',
            message: err.message
          }
        })
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
