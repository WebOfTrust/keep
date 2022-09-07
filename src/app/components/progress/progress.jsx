import m from 'mithril';
import './progress.scss';

class Progress {
  view(vnode) {
    const percent = (vnode.attrs.stepNum / vnode.attrs.totalSteps) * 100;
    const textLeft = `calc(${percent}% - ${(vnode.attrs.stepLabel.length / 2) * 5}px)`;
    const circleLeft = `calc(${percent}% - 12px)`;
    return (
      <>
        <div class="progress">
          <div
            class="progress-fill"
            style={{
              width: `${percent}%`,
            }}
          ></div>
          <div
            class="progress-label"
            style={{
              left: textLeft,
            }}
          >
            {vnode.attrs.stepLabel}
          </div>
          <div
            class="progress-circle"
            style={{
              left: circleLeft,
            }}
          >
            <div class="progress-circle-text">{vnode.attrs.stepNum}</div>
          </div>
          {vnode.attrs.stepNum !== vnode.attrs.totalSteps && (
            <div class="progress-circle progress-circle--end">
              <div class="progress-circle-text">{vnode.attrs.totalSteps}</div>
            </div>
          )}
        </div>
      </>
    );
  }
}

module.exports = Progress;
