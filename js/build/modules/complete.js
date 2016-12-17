"use strict";define(["knockout","pubsub"],function(e,n){return function(o){var s=this;this.calculateWinnerModal=e.observable(!1),this.closeModal=e.observable(!1),this.gameLeaders=e.observableArray([]),this.isGameComplete=function(){var e=!1,n=!1;return o.score.remainingPoints()<=0&&(e=!0),o.round.isRoundFinished()&&(n=!0),s.gameLeaders().length>1&&(n=!1),e&&n},this.showWinnerModal=e.pureComputed(function(){return s.calculateWinnerModal(),s.isGameComplete()&&!s.closeModal()}),this.winnerModalClosing=e.pureComputed(function(){return s.closeModal()===!0}),this.closeModalAction=function(){s.closeModal(!0),setTimeout(function(){s.modalCanOpenAgain()},1e3)},this.modalCanOpenAgain=e.pureComputed(function(){o.score.topScore()<=o.score.gameEndScore()&&s.closeModal(!1)}),this.closeAndReset=function(){s.closeModalAction(),o.resetGame(!0)},n.subscribe("game.reset",function(){s.modalCanOpenAgain()}),n.subscribe("game.score.change",function(){s.modalCanOpenAgain()}),n.subscribe("round.complete",function(e,n){n>1&&s.calculateWinnerModal.notifySubscribers()}),n.subscribe("score.leaders",function(e,n){s.gameLeaders(n)})}});