//default values
var defaultOptions = {
  show: true,
  type: 'phone'
};

// Docsify plugin functions
function plugin(hook, vm) {
  if (!defaultOptions.show) {
    return false;
  }
  var iframe;
  hook.beforeEach(function (content) {
    return content;
  });
  hook.afterEach(function (html, next) {
    next(html);
    if (window.location.href.indexOf('examples') >= 0) {
      $('.content').css('padding-right', '0px')
      $('.preview').remove()
      return false;
    }
    $('.content').removeAttr('style')
    // 向页面添加iframe容器
    iframe = $('.preview').length ? $('.preview') : $(`
      <div class="preview ${defaultOptions.type}">
        <div class="preview-content">
          <div class="preview-bar">
            <input type="text"/>
            <button id="jump"><svg t="1616579963322" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="16" height="16"><path d="M774.59911111 91.97037037c-2.61688889 0.34133333-5.34755555 0.11377778-7.96444444 0.11377778-43.23555555 0-86.47111111-0.11377778-129.70666667 0.11377777-12.51555555 0-24.91733333 1.59288889-36.864 5.80266667-21.16266667 7.39555555-33.90577778 22.18666667-39.13955555 43.69066666-1.93422222 7.96444445-2.73066667 16.04266667-2.73066667 24.23466667 0 76.45866667-0.11377778 152.80355555 0.11377777 229.26222223 0 15.70133333 1.024 31.40266667 7.05422223 46.42133333 7.85066667 19.456 22.41422222 30.94755555 42.43911111 36.06755555 7.168 1.82044445 14.56355555 2.50311111 21.95911111 2.50311112h248.03555555c9.44355555 0 18.88711111-0.79644445 28.2168889-2.6168889 27.76177778-5.12 45.96622222-23.552 51.08622222-51.2 0.45511111-2.50311111-0.45511111-5.91644445 3.29955555-7.05422222v-263.96444444c-0.45511111-0.45511111-0.56888889-1.024-0.56888889-1.70666667-1.70666667-5.46133333-1.93422222-11.15022222-3.75466666-16.72533333-8.07822222-23.89333333-24.68977778-38.00177778-48.69688889-44.14577777-7.28177778-1.82044445-14.56355555-2.73066667-22.18666667-2.38933334-1.47911111 0.11377778-3.41333333 1.13777778-4.43733333-1.024h-101.26222223c-0.45511111 2.95822222-3.072 2.38933333-4.89244444 2.61688889z m112.29866667 46.30755555c4.55111111 0 9.216 1.024 13.53955555 2.38933333 7.85066667 2.50311111 12.17422222 8.64711111 12.17422222 17.18044445 0 85.10577778 0.11377778 170.21155555-0.11377777 255.31733333 0 12.74311111-9.78488889 20.48-24.00711111 20.59377779-43.46311111 0.34133333-86.81244445 0.11377778-130.27555556 0.11377777h-128.56888889c-5.12 0-9.78488889-1.47911111-14.44977777-3.072-9.67111111-3.52711111-10.92266667-11.94666667-11.03644445-20.36622222-0.22755555-42.66666667-0.11377778-85.33333333-0.11377778-128V162.39881482c0-7.39555555 1.70666667-14.22222222 7.85066667-19.34222223 5.23377778-4.32355555 11.71911111-4.89244445 17.74933333-4.89244444 85.78844445-0.11377778 171.57688889 0 257.25155556 0.11377777z" p-id="2286" fill="#ffffff"></path><path d="M773.68888889 90.2637037c-44.94222222 0.11377778-89.88444445 0.11377778-134.71288889 0.11377778-10.69511111 0-21.16266667 1.13777778-31.51644445 3.52711111-13.19822222 3.072-25.14488889 8.76088889-34.13333333 19.00088889-12.06044445 13.76711111-16.83911111 30.60622222-16.83911111 48.46933334-0.22755555 79.18933333-0.22755555 158.49244445 0 237.68177777 0 10.35377778 0.79644445 20.82133333 3.18577778 30.94755556 3.18577778 13.312 8.64711111 25.6 19.00088889 34.70222222 13.312 11.71911111 29.46844445 17.06666667 47.21777777 17.06666666 84.30933333 0.11377778 168.73244445 0.11377778 253.04177778 0 10.58133333 0 21.27644445-0.56888889 31.51644445-3.41333333 21.61777778-6.144 38.22933333-18.09066667 45.51111111-40.73244445 1.93422222-6.03022222 2.048-12.40177778 4.32355556-18.31822222-3.64088889 1.13777778-2.84444445 4.55111111-3.29955556 7.05422222-5.12 27.76177778-23.32444445 46.08-51.08622222 51.2-9.32977778 1.70666667-18.77333333 2.61688889-28.21688889 2.6168889h-248.03555556c-7.39555555 0-14.79111111-0.68266667-21.95911111-2.50311112-19.91111111-5.12-34.58844445-16.61155555-42.43911111-36.06755555-6.03022222-14.90488889-7.05422222-30.72-7.05422222-46.42133333-0.22755555-76.45866667-0.11377778-152.80355555-0.11377778-229.26222223 0-8.192 0.79644445-16.27022222 2.73066667-24.23466667 5.23377778-21.504 17.97688889-36.29511111 39.13955555-43.69066666 11.94666667-4.20977778 24.34844445-5.68888889 36.864-5.80266667 43.23555555-0.22755555 86.47111111-0.11377778 129.70666667-0.11377777 2.61688889 0 5.34755555 0.22755555 7.96444444-0.11377778 1.93422222-0.22755555 4.43733333 0.22755555 4.77866667-2.73066667-1.36533333 2.38933333-3.64088889 1.024-5.57511111 1.024zM66.67377778 420.56059259c2.27555555 14.22222222 6.25777778 27.76177778 16.27022222 38.68444444 13.08444445 14.44977778 30.15111111 20.48 48.92444445 20.59377779 85.44711111 0.34133333 170.89422222 0.34133333 256.4551111 0 10.69511111 0 21.504-1.13777778 31.97155556-4.43733334 27.87555555-8.76088889 44.48711111-31.06133333 44.48711111-60.416 0-84.19555555 0-168.27733333 0.11377778-252.47288889 0-7.28177778-0.91022222-14.336-2.73066667-21.39022222-6.59911111-25.48622222-27.87555555-44.48711111-54.04444444-48.128-4.66488889-0.68266667-9.32977778-1.25155555-14.10844444-1.25155555-2.27555555 0-5.12 0.68266667-5.91644445-2.73066667h-101.26222222c-1.47911111 2.38933333-3.75466667 1.024-5.57511111 1.024-46.76266667 0.11377778-93.52533333-0.22755555-140.288 0.22755555-16.83911111 0.11377778-33.22311111 2.95822222-48.01422222 12.17422222-14.22222222 8.87466667-22.528 21.73155555-26.96533334 37.54666667-0.91022222 3.072-0.22755555 6.48533333-2.16177778 9.32977778v265.10222222c3.29955555 1.024 2.50311111 3.98222222 2.84444445 6.144z m44.94222222-262.82666667c0-9.216 7.05422222-16.61155555 16.49777778-18.54577777 5.00622222-1.024 10.01244445-1.13777778 15.01866667-1.13777778h249.17333333c4.89244445 0 9.55733333 0.91022222 14.10844444 2.27555555 8.53333333 2.73066667 12.288 7.85066667 12.288 16.61155556v256.56888889c0 9.32977778-4.32355555 15.13244445-13.19822222 18.09066666-4.55111111 1.47911111-9.216 2.38933333-14.10844445 2.27555556-42.32533333-0.11377778-84.53688889-0.11377778-126.86222222-0.11377777-42.89422222 0-85.67466667 0.11377778-128.56888888-0.11377779-7.168 0-14.336-1.024-19.68355556-6.94044444-3.072-3.41333333-4.66488889-7.168-4.66488889-11.49155556-0.11377778-85.67466667-0.11377778-171.57688889 0-257.47911111z" p-id="2287" fill="#ffffff"></path><path d="M64.85333333 417.37481482c0.11377778 10.12622222 2.95822222 19.68355555 7.28177778 28.55822221 11.83288889 24.34844445 32.88177778 35.27111111 58.70933334 35.49866667 84.76444445 0.68266667 169.52888889 0.22755555 254.17955555 0.22755555 10.58133333 0 21.16266667-0.91022222 31.51644445-3.41333333 30.83377778-7.62311111 49.60711111-30.03733333 49.83466666-61.8951111 0.56888889-83.968 0.22755555-167.936 0.22755556-251.904 0-5.57511111 0-11.15022222-1.024-16.72533334-3.41333333-18.432-12.17422222-33.45066667-27.53422222-44.37333333-12.51555555-8.87466667-26.73777778-12.51555555-41.984-12.97066667-2.61688889-0.11377778-5.57511111 1.36533333-7.85066667-1.024 0.79644445 3.41333333 3.75466667 2.73066667 5.91644444 2.73066667 4.77866667 0 9.44355555 0.68266667 14.10844445 1.25155555 26.16888889 3.64088889 47.44533333 22.64177778 54.04444444 48.128 1.82044445 7.05422222 2.73066667 14.10844445 2.73066667 21.39022222-0.11377778 84.19555555 0 168.27733333-0.11377778 252.4728889 0 29.24088889-16.61155555 51.54133333-44.48711111 60.416-10.46755555 3.29955555-21.27644445 4.43733333-31.97155556 4.43733333-85.44711111 0.22755555-170.89422222 0.34133333-256.45511111 0-18.77333333-0.11377778-35.72622222-6.144-48.92444444-20.59377778-10.01244445-11.03644445-13.99466667-24.46222222-16.27022223-38.68444445-0.34133333-2.16177778 0.45511111-5.23377778-2.95822222-5.91644444 1.47911111 0.11377778 1.024 1.47911111 1.024 2.38933334zM147.68355555 958.04681482c2.38933333-0.34133333 4.89244445-0.11377778 7.39555556-0.11377779h234.38222222c9.55733333 0 18.88711111-1.13777778 28.10311112-3.52711111 29.01333333-7.50933333 47.104-30.60622222 47.21777777-60.52977777 0.11377778-28.78577778 0-57.68533333 0-86.47111112v-168.39111111c0-36.75022222-24.34844445-63.94311111-60.98488889-67.92533333-12.97066667-1.36533333-26.05511111-1.93422222-39.13955555-2.27555556-39.25333333-0.79644445-78.50666667 0.56888889-117.64622223 1.47911112-37.54666667 0.91022222-75.09333333 0.22755555-112.52622222 0.79644444-13.08444445 0.22755555-25.71377778 3.072-37.20533333 9.216-15.47377778 8.192-24.91733333 21.04888889-29.24088889 38.00177778-0.79644445 3.18577778-0.11377778 7.39555555-4.20977778 9.10222222v266.24c2.27555555 6.25777778 2.50311111 12.97066667 4.43733334 19.456 6.71288889 23.552 22.07288889 37.888 45.28355555 44.25955556 7.39555555 2.048 15.01866667 2.61688889 22.64177778 2.38933333 1.59288889 0 3.75466667-1.25155555 5.00622222 1.024h2.27555556c0.22755555-2.61688889 2.38933333-2.50311111 4.20977777-2.73066666z m-12.97066666-46.19377779c-13.88088889 0-23.552-7.50933333-23.43822222-23.32444444 0.45511111-83.39911111 0.22755555-166.79822222 0.11377778-250.31111111 0-13.42577778 7.96444445-20.59377778 20.82133333-21.04888889 84.87822222-2.73066667 169.64266667-0.56888889 254.52088889-0.91022222 7.28177778 0 15.24622222-0.45511111 22.30044444 3.41333333 6.144 3.41333333 9.67111111 8.192 9.67111111 15.58755555-0.11377778 42.66666667 0 85.33333333 0 128 0 42.32533333-0.22755555 84.53688889 0.11377778 126.86222223 0.11377778 13.76711111-8.87466667 20.02488889-21.27644445 21.95911111-9.78488889 1.47911111-19.34222222 0-29.01333333-0.11377777-77.93777778-0.22755555-155.87555555-0.11377778-233.81333333-0.11377779z" p-id="2288" fill="#ffffff"></path><path d="M149.61777778 959.75348148c77.14133333-0.11377778 154.39644445-0.11377778 231.53777777 0 10.69511111 0 21.27644445-0.22755555 31.85777778-2.38933333 14.22222222-2.84444445 27.07911111-8.87466667 36.97777778-19.456 11.03644445-11.83288889 16.49777778-26.624 16.49777778-42.78044445 0.22755555-84.53688889 0.11377778-169.18755555 0.11377778-253.72444445 0-7.168-0.45511111-14.10844445-2.27555556-21.04888888-6.03022222-22.64177778-19.68355555-38.34311111-41.75644444-46.99022222-15.13244445-5.91644445-31.06133333-5.68888889-46.64888889-6.03022223-26.28266667-0.56888889-52.56533333-1.024-78.848 0.5688889-21.61777778 1.36533333-43.46311111 0.34133333-65.19466667 1.13777777-31.40266667 1.024-62.91911111 0.34133333-94.43555556 0.22755556-7.28177778 0-14.44977778 0.68266667-21.61777777 2.27555555-20.93511111 4.77866667-36.97777778 15.70133333-46.19377778 35.61244445-2.95822222 6.48533333-3.18577778 13.65333333-5.91644445 20.13866667 4.20977778-1.70666667 3.41333333-5.91644445 4.20977778-9.10222223 4.32355555-16.95288889 13.88088889-29.80977778 29.24088889-38.00177777 11.60533333-6.144 24.12088889-8.98844445 37.20533333-9.216 37.54666667-0.56888889 74.97955555 0.11377778 112.52622223-0.79644445 39.25333333-0.91022222 78.39288889-2.27555555 117.64622222-1.47911112 13.08444445 0.22755555 26.16888889 0.79644445 39.13955555 2.27555557 36.63644445 3.98222222 60.87111111 31.17511111 60.9848889 67.92533333v168.3911111c0 28.78577778 0.11377778 57.68533333 0 86.47111112-0.22755555 30.03733333-18.20444445 53.02044445-47.21777778 60.52977778-9.216 2.38933333-18.54577778 3.52711111-28.10311112 3.5271111h-234.38222222c-2.50311111 0-4.89244445-0.11377778-7.39555555 0.11377778-1.82044445 0.22755555-3.98222222 0-4.20977778 2.73066667 1.70666667-2.16177778 4.20977778-0.91022222 6.25777778-0.91022222z" p-id="2289" fill="#ffffff"></path><path d="M92.84266667 102.66548148c14.79111111-9.10222222 31.17511111-12.06044445 48.01422222-12.17422223 46.76266667-0.45511111 93.52533333-0.11377778 140.288-0.22755555 1.82044445 0 4.096 1.36533333 5.57511111-1.024-1.93422222 1.13777778-4.096 0.56888889-6.144 0.56888889-50.97244445 0.34133333-101.94488889-0.91022222-152.91733333 0.68266666-21.504 0.68266667-39.70844445 9.216-52.90666667 26.85155557-7.168 9.55733333-10.35377778 20.48-11.03644445 32.1991111 2.048-2.73066667 1.36533333-6.144 2.16177778-9.32977777 4.55111111-15.81511111 12.74311111-28.672 26.96533334-37.54666667zM885.19111111 90.2637037c7.50933333-0.34133333 14.90488889 0.56888889 22.18666667 2.38933333 23.89333333 6.144 40.61866667 20.25244445 48.69688889 44.14577779 1.82044445 5.46133333 2.048 11.264 3.75466666 16.72533333v-0.45511112c0.45511111-31.97155555-27.76177778-60.52977778-59.96088888-62.91911111-6.37155555-0.45511111-12.74311111 0.56888889-19.11466667-1.024 0.91022222 2.38933333 2.95822222 1.25155555 4.43733333 1.13777778zM136.07822222 959.75348148c-7.62311111 0.22755555-15.24622222-0.34133333-22.64177777-2.38933333-23.21066667-6.37155555-38.57066667-20.70755555-45.28355556-44.25955556-1.82044445-6.48533333-2.048-13.19822222-4.43733334-19.456 1.25155555 6.03022222 0.91022222 12.288 2.38933334 18.31822223 6.25777778 25.94133333 29.01333333 46.19377778 55.296 47.78666666 6.59911111 0.45511111 13.19822222-0.68266667 19.68355556 0.91022222-1.25155555-2.16177778-3.41333333-1.024-5.00622223-0.91022222z" p-id="2290" fill="#ffffff"></path><path d="M621.68177778 712.8557037c-13.99466667 0.22755555-23.21066667 9.44355555-23.21066667 22.75555555V931.08148148c0 13.99466667 9.67111111 22.86933333 23.66577778 22.64177777 14.67733333-0.22755555 23.89333333-7.85066667 24.00711111-22.41422222 0.22755555-65.30844445 0.11377778-130.73066667 0-196.03911111 0-13.65333333-9.55733333-22.64177778-24.46222222-22.41422222zM909.53955555 713.08325925c-11.264-2.048-26.51022222 5.57511111-26.51022222 20.70755557-0.22755555 33.22311111 0 66.33244445 0 99.55555555v98.98666666c0 1.82044445-0.11377778 3.86844445 0.45511112 5.57511112 3.75466667 10.69511111 16.384 18.432 26.73777777 15.92888888 12.97066667-3.072 20.36622222-8.192 20.48-24.34844444 0.22755555-63.14666667 0.11377778-126.29333333 0.11377778-189.44-0.11377778-16.384-5.23377778-24.00711111-21.27644445-26.96533334zM804.06755555 781.23614815c-2.95822222-10.69511111-14.79111111-19.11466667-25.14488888-17.18044445-14.10844445 2.73066667-22.07288889 7.50933333-22.18666667 23.77955555-0.34133333 46.76266667-0.11377778 93.63911111-0.11377778 140.40177778 0 15.70133333 6.48533333 22.75555555 19.91111111 25.25866667 12.62933333 2.38933333 27.76177778-5.12 27.87555556-21.73155555v-72.2488889-73.38666666c0-1.47911111 0-3.29955555-0.34133334-4.89244444zM772.55111111 573.5917037c-9.89866667 2.16177778-15.92888889 11.60533333-15.92888889 22.528V696.69925925c0 14.90488889 4.55111111 23.89333333 20.59377778 26.96533334 11.71911111 2.16177778 27.30666667-5.91644445 27.19288889-21.04888889-0.11377778-17.97688889 0-35.95377778 0-54.04444445 0-17.408-0.22755555-34.816 0-52.33777777 0.34133333-21.61777778-16.61155555-25.94133333-31.85777778-22.64177778zM637.15555555 576.54992592c-5.57511111-3.86844445-11.49155555-3.75466667-17.52177777-3.75466667-11.94666667 0-21.04888889 8.98844445-21.04888889 20.82133334v29.58222223c0 10.24-0.11377778 20.48 0 30.72 0.11377778 5.23377778 1.47911111 9.89866667 5.57511111 13.99466666 5.91644445 5.91644445 12.74311111 7.62311111 20.70755555 7.39555555 11.264-0.34133333 21.39022222-10.12622222 21.39022223-21.27644444 0.11377778-20.13866667 0.22755555-40.16355555-0.11377778-60.30222222 0-6.94044445-2.73066667-12.85688889-8.98844445-17.18044445zM928.768 586.22103703c-2.50311111-7.05422222-11.15022222-13.42577778-20.36622222-13.65333333-16.27022222-0.56888889-26.85155555 8.98844445-25.6 25.94133333 0.56888889 7.96444445 0.11377778 15.92888889 0.11377777 23.89333334v28.44444445c0 1.70666667 0 3.41333333 0.45511112 5.00622221 3.64088889 11.71911111 14.67733333 17.63555555 27.19288888 15.92888889 12.51555555-1.82044445 19.79733333-9.55733333 20.0248889-22.41422222 0.34133333-17.97688889 0.11377778-36.06755555 0.11377777-54.04444445 0-3.29955555-0.91022222-6.25777778-1.93422222-9.10222222zM329.95555555 247.04948148c-2.16177778-8.30577778-8.98844445-14.44977778-17.52177777-15.58755556-1.47911111-0.22755555-3.072-0.45511111-4.55111111-0.4551111-0.68266667 0-1.70666667 0.22755555-1.93422222-0.91022223h-32.768c-0.45511111 0.79644445-1.25155555 0.34133333-1.82044445 0.34133333-15.13244445 0-30.26488889-0.11377778-45.39733333 0.11377778-5.46133333 0-10.80888889 1.024-15.58755556 3.98222222-4.66488889 2.84444445-7.28177778 7.05422222-8.76088889 12.17422223-0.22755555 1.024 0 2.16177778-0.68266667 2.95822222v85.90222222c1.13777778 0.22755555 0.79644445 1.25155555 0.91022223 1.93422223 0.79644445 4.66488889 2.048 8.98844445 5.23377777 12.51555555 4.20977778 4.66488889 9.78488889 6.59911111 15.81511112 6.71288888 27.648 0.11377778 55.40977778 0.11377778 83.05777778 0 3.52711111 0 6.94044445-0.34133333 10.35377777-1.4791111 8.98844445-2.84444445 14.44977778-10.12622222 14.44977778-19.56977778v-81.80622222c0.11377778-2.27555555-0.22755555-4.55111111-0.79644445-6.82666667zM823.18222222 238.28859259c-2.16177778-8.30577778-8.98844445-14.44977778-17.52177777-15.58755556-1.47911111-0.22755555-3.072-0.45511111-4.55111112-0.45511111-0.68266667 0-1.70666667 0.22755555-1.93422222-0.91022222h-32.768c-0.45511111 0.79644445-1.25155555 0.34133333-1.82044444 0.34133333-15.13244445 0-30.26488889-0.11377778-45.39733334 0.11377779-5.46133333 0-10.80888889 1.024-15.58755555 3.98222221-4.66488889 2.84444445-7.28177778 7.05422222-8.76088889 12.17422222-0.22755555 1.024 0 2.16177778-0.68266667 2.95822223v85.90222222c1.13777778 0.22755555 0.79644445 1.25155555 0.91022223 1.93422222 0.79644445 4.66488889 2.048 8.98844445 5.23377777 12.51555556 4.20977778 4.66488889 9.78488889 6.59911111 15.81511111 6.71288889 27.648 0.11377778 55.40977778 0.11377778 83.05777778 0 3.52711111 0 6.94044445-0.34133333 10.35377778-1.47911112 8.98844445-2.84444445 14.44977778-10.12622222 14.44977778-19.56977777v-81.80622223c0.22755555-2.27555555-0.22755555-4.66488889-0.79644445-6.82666666zM329.27288889 723.55081482c-2.16177778-8.30577778-8.98844445-14.44977778-17.52177778-15.58755557-1.47911111-0.22755555-3.072-0.45511111-4.55111111-0.4551111-0.68266667 0-1.70666667 0.22755555-1.93422222-0.91022223h-32.768c-0.45511111 0.79644445-1.25155555 0.34133333-1.82044445 0.34133333-15.13244445 0-30.26488889-0.11377778-45.39733333 0.11377778-5.46133333 0-10.80888889 1.024-15.58755555 3.98222222-4.66488889 2.84444445-7.28177778 7.05422222-8.7608889 12.17422223-0.22755555 1.024 0 2.16177778-0.68266666 2.95822222v85.90222222c1.13777778 0.22755555 0.79644445 1.25155555 0.91022222 1.93422223 0.79644445 4.66488889 2.048 8.98844445 5.23377778 12.51555555 4.20977778 4.66488889 9.78488889 6.59911111 15.81511111 6.71288889 27.648 0.11377778 55.40977778 0.11377778 83.05777778 0 3.52711111 0 6.94044445-0.34133333 10.35377777-1.47911111 8.98844445-2.84444445 14.44977778-10.12622222 14.44977778-19.56977778v-81.80622222c0.11377778-2.27555555-0.22755555-4.55111111-0.79644444-6.82666666z" p-id="2291" fill="currentColor"></path></svg></button>
            <div class="qrcode" id="yl"></div>
          </div>
          <iframe src=""></iframe>
        </div>
      </div>
    `).appendTo('main')
    // 根据类型加载页面
    var a = window.location.href.split('/')
    var theme = window.localStorage.getItem('theme') || 'default'
    var name = a[a.length - 2]
    var origin = window.location.origin
    var path = window.location.pathname
    var base = `${origin}${path}src/components/${name}/index.html`
    var url = base
    url = `${url}?theme=${theme}`
    var ifr = iframe.find('iframe')
    ifr.css('background', '#fff')
    iframe.find('input').val(url)
    IsLoad(url, function(res) {
      if (res) {
        ifr.attr('src', url)
        $('#jump').click(function(e){
          e.stopPropagation()
          $('#yl').html('')
          new QRCode(document.querySelector('#yl'), {
            text: iframe.find('input').val(),
            width: 160,
            height: 160,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
          });
          $('#yl').show()
        })
        $('body').click(function(){
          $('#yl').html('')
          $('#yl').hide()
        })
        window.localStorage.setItem('url', url)
      } else {
        ifr.attr('src', `${origin}${path}404.html`)
        iframe.remove()
        $('.content').css('padding-right', '0px')
      }
    })
  });
}

// Docsify plugin options
window.$docsify['phone'] = Object.assign(defaultOptions, window.$docsify['phone']);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);