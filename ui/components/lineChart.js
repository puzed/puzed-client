/* global echarts */

const mithril = require('mithril');

function lineChart () {
  let chart;

  function render (vnode) {
    if (!vnode.attrs.data) {
      return;
    }

    if (chart) {
      chart.setOption({
        xAxis: {
          data: vnode.attrs.data.date
        },
        series: [
          {
            data: vnode.attrs.data.data
          }
        ]
      });
      return;
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: vnode.attrs.formatter || undefined,
        position: function (pt) {
          return [pt && pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: vnode.attrs.title
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: vnode.attrs.data.date
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '10%']
      },
      dataZoom: [{
        type: 'inside',
        start: 75,
        end: 100
      }, {
        start: 75,
        end: 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '75%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [
        {
          animation: false,
          name: 'Value',
          type: 'line',
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: '#0c0731'
          },
          areaStyle: {
            color: '#0c0731'
          },
          data: vnode.attrs.data.data
        }
      ]
    };

    chart = echarts.init(vnode.dom);

    chart.setOption(option);
    setTimeout(() => {
      chart.setOption({
        series: [
          {
            animation: true
          }
        ]
      });
    });
  }

  return {
    oncreate: render,
    onupdate: render,

    view: () => mithril('div', { style: 'width: 100%; height:400px;' })
  };
}

module.exports = lineChart;
