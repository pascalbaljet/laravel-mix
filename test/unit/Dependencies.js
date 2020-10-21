import '../../src/helpers';
import test from 'ava';
import childProcess from 'child_process';
import sinon from 'sinon';
import Dependencies from '../../src/Dependencies';

test.beforeEach(() => {
    console.log = () => {};

    sinon.stub(childProcess, 'execSync');
});

test.afterEach.always(() => {
    childProcess.execSync.restore();
});

test('it installs a single dependency', t => {
    new Dependencies(['browser-sync']).install(false);

    t.true(
        childProcess.execSync.calledWith(
            'npm install browser-sync --save-dev --production=false'
        )
    );
});

test('it installs multiple dependencies', t => {
    new Dependencies(['browser-sync', 'browser-sync-webpack-plugin']).install(false);

    t.true(
        childProcess.execSync.calledWith(
            'npm install browser-sync browser-sync-webpack-plugin --save-dev --production=false'
        )
    );
});
